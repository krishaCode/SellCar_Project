package com.example.Sell_Car.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtil {
    private static final Logger log = LoggerFactory.getLogger(JWTUtil.class);

    // Read Base64-encoded secret from application.properties: jwt.secret
    // If it's not provided or invalid, we fallback to a generated secure key.
    @Value("${jwt.secret:}")
    private String secretBase64;

    private Key getSigningKey(){
        if (secretBase64 != null && !secretBase64.isBlank()){
            try {
                byte[] keyBytes = Decoders.BASE64.decode(secretBase64);
                // Keys.hmacShaKeyFor will throw if key is too short
                return Keys.hmacShaKeyFor(keyBytes);
            } catch (Exception e){
                log.warn("Provided jwt.secret is invalid or too weak; falling back to a generated secure key. Error: {}", e.getMessage());
            }
        } else {
            log.warn("No jwt.secret configured — using a generated key for signing (not suitable for production). Set 'jwt.secret' in application.properties as a Base64-encoded >=256-bit key.");
        }

        // fallback: generate a secure key for HS256
        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    private <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);

    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, String userEmail){
        final String username = extractUsername(token);
        return (username != null && username.equals(userEmail) && !isTokenExpired(token));
    }

    private String generateToken(Map<String, Object> extractClaims, UserDetails userDetails){
        return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L*60*60*24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

}

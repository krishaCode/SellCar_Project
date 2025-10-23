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

    // Read secret from application.properties: jwt.secret
    // The property may be Base64-encoded key bytes or a passphrase. We ensure a 256-bit key is returned.
    @Value("${jwt.secret:}")
    private String jwtSecret;

    private Key getSigningKey(){
        if (jwtSecret != null && !jwtSecret.isBlank()){
            // try treating it as Base64-encoded key bytes first
            try {
                byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
                if (keyBytes.length >= 32) { // 256 bits == 32 bytes
                    return Keys.hmacShaKeyFor(keyBytes);
                } else {
                    log.warn("Configured jwt.secret (base64) decoded to {} bytes which is less than 32; will derive a 256-bit key from the secret text.", keyBytes.length);
                }
            } catch (Exception e){
                // not valid base64 or decode failed; we'll derive a key from the raw string
                log.debug("jwt.secret is not valid base64 or decode failed: {}. Will derive a 256-bit key from the provided secret text.", e.getMessage());
            }

            // Derive a 256-bit key by taking the SHA-256 digest of the provided secret string
            try {
                java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
                byte[] hash = digest.digest(jwtSecret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
                return Keys.hmacShaKeyFor(hash);
            } catch (Exception e){
                log.warn("Failed to derive key from jwt.secret; falling back to generated key. Error: {}", e.getMessage());
            }
        } else {
            log.warn("No jwt.secret configured — using a generated key for signing (not suitable for production). Set 'jwt.secret' in application.properties as a Base64-encoded >=256-bit key or a strong passphrase.");
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

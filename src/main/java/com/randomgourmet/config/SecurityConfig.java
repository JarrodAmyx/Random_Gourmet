// package com.randomgourmet.config;

// import com.randomgourmet.repository.UserRepository;
// //import com.appsdeveloperblog.app.ws.io.entity.UserEntity;

// import java.io.IOException;
// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
// import io.jsonwebtoken.Jwts;

// public class AuthorizationFilter extends BasicAuthenticationFilter {
//     UserRepository userRepository;

//     public AuthorizationFilter(AuthenticationManager authManager,
//                                UserRepository userRepository) {
//         super(authManager);
//         this.userRepository = userRepository;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest req,
//                                     HttpServletResponse res,
//                                     FilterChain chain) throws IOException, ServletException {
//         String header = req.getHeader(SecurityConstants.HEADER_STRING);
//         if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
//             chain.doFilter(req, res);
//             return;
//         }
//         UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
//         SecurityContextHolder.getContext().setAuthentication(authentication);
//         chain.doFilter(req, res);
//     }

//     private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
//         String token = request.getHeader(SecurityConstants.HEADER_STRING);
//         if (token != null) {
//             token = token.replace(SecurityConstants.TOKEN_PREFIX, "");
//             String user = Jwts.parser()
//                     .setSigningKey(SecurityConstants.getTokenSecret())
//                     .parseClaimsJws(token)
//                     .getBody()
//                     .getSubject();
//             if (user != null) {
//                 UserEntity userEntity = userRepository.findByEmail(user);
//                 return new UsernamePasswordAuthenticationToken(user, null, new UserPrincipal(userEntity).getAuthorities());
//             }
//             return null;
//         }
//         return null;
//     }
// }
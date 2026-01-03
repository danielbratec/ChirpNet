package com.chirpnet.backend.controller;

import com.chirpnet.backend.entity.Post;
import com.chirpnet.backend.entity.User;
import com.chirpnet.backend.repository.PostRepository;
import com.chirpnet.backend.repository.UserRepository;
import com.chirpnet.backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final SimpMessagingTemplate messagingTemplate;
    
    public PostController(PostRepository postRepository,
                          UserRepository userRepository,
                          JwtUtil jwtUtil, SimpMessagingTemplate, messagingTemplate) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByIdDesc();
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Map<String, String> body,
                                        @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token necessário");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        User author = userRepository.findByUsername(username)
                .orElse(null);

        if (author == null) {
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }

        Post post = new Post();
        post.setContent(body.get("content"));
        post.setAuthor(author);

        postRepository.save(post);
        return ResponseEntity.ok(post);
    }
}

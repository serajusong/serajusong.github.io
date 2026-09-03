package com.example.demo.controller;

import com.example.demo.domain.Rsvp;
import com.example.demo.repository.RsvpRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = "*")
public class RsvpController {

    private final RsvpRepository repo;

    public RsvpController(RsvpRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Rsvp> create(@Valid @RequestBody Rsvp rsvp) {
        if (rsvp.getGuestCount() == null) rsvp.setGuestCount(1);
        Rsvp saved = repo.save(rsvp);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Rsvp> list() {
        return repo.findAll();
    }
}

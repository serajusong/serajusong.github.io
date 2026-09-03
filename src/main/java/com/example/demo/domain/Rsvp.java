package com.example.demo.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rsvp")
public class Rsvp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 30)
    private String name;

    @Size(max = 20)
    private String phone;

    @NotNull
    private Boolean attending;

    @Min(0) @Max(10)
    private Integer guestCount;

    @Size(max = 500)
    private String message;

    @Size(max = 500)
    private String companions;

    private LocalDateTime createdAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Boolean getAttending() { return attending; }
    public void setAttending(Boolean attending) { this.attending = attending; }
    public Integer getGuestCount() { return guestCount; }
    public void setGuestCount(Integer guestCount) { this.guestCount = guestCount; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getCompanions() { return companions; }
    public void setCompanions(String companions) { this.companions = companions; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

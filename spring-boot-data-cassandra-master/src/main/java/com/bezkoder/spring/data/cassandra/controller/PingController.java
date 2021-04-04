package com.bezkoder.spring.data.cassandra.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {


  @GetMapping("/ping")
  public String ping() {
    return "pong";
  }
}

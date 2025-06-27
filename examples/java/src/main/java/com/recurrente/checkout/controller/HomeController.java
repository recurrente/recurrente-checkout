package com.recurrente.checkout.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/success")
    public String success(@RequestParam(value = "checkoutId", required = false) String checkoutId, Model model) {
        model.addAttribute("checkoutId", checkoutId);
        return "success";
    }

    @GetMapping("/failure")
    public String failure() {
        return "failure";
    }
}

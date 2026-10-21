package com.icecream.shop.controller;

import com.icecream.shop.model.Order;
import com.icecream.shop.repository.OrderRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080"
})
public class OrderController {

    private final OrderRepository repository;

    public OrderController(OrderRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Map<String, Object> data) {

        Object name = data.get("customerName");
        Object totalValue = data.get("total");

        if (!(name instanceof String customerName)
                || customerName.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Customer name is required"
            );
        }

        if (!(totalValue instanceof Number number)
                || number.doubleValue() <= 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid order total"
            );
        }

        Order order = new Order();

        order.setCustomerName(customerName.trim());
        order.setTotal(new BigDecimal(number.toString()));

        return repository.save(order);
    }
}

package com.inventory.inventory_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventoryDTO {
    private int inventoryId;
    private String itemType;
    private String itemName;
    private String brand;
    private String itemDescription;
    private double price;
    private Date expireDate;

}

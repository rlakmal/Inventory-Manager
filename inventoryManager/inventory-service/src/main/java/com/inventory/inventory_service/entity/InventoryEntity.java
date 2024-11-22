package com.inventory.inventory_service.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "inventory")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventoryEntity {

   @Id
   @Column(name = "inventory_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int inventoryId;

   @Column(name = "item_type")
   private String itemType;

   @Column(name = "item_name")
   private String itemName;

   @Column(name = "brand")
   private String brand;

   @Column(name = "item_description")
   private String itemDescription;

   @Column(name = "price")
   private double price;

   @Column(name = "expire_date")
   private Date expireDate;

   public InventoryEntity(String itemType, String itemName, String brand, String itemDescription, double price, Date expireDate) {
      this.itemType = itemType;
      this.itemName = itemName;
      this.brand = brand;
      this.itemDescription = itemDescription;
      this.price = price;
      this.expireDate = expireDate;
   }
}

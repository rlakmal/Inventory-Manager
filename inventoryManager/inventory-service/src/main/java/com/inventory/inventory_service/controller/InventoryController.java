package com.inventory.inventory_service.controller;
import com.inventory.inventory_service.dto.InventoryDTO;
import com.inventory.inventory_service.repo.InventoryRepo;
import com.inventory.inventory_service.service.InventoryService;
import com.inventory.inventory_service.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping()
    public StandardResponse addInventory(@RequestBody InventoryDTO inventoryDTO){
        System.out.println(inventoryDTO);
        return inventoryService.addItem(inventoryDTO) ;
    }

    @PutMapping(path = "/{id}")
    public StandardResponse updateInventory(@PathVariable(value = "id") int inventoryId, @RequestBody InventoryDTO inventoryDTO){
        return inventoryService.updateItem(inventoryId,inventoryDTO);
    }

//    @GetMapping
//    public StandardResponse getAllItems(){
//        return inventoryService.getItems();
//    }

    @DeleteMapping(path = "/{id}")
    public StandardResponse deleteInventory(@PathVariable(value = "id")int inventoryId){
        return inventoryService.deleteInventory(inventoryId);

    }

    @GetMapping(
            params = {"page","size"}

    )
    public StandardResponse getAllItems(
            @RequestParam(value = "page") int page,
            @RequestParam(value = "size",defaultValue = "10") int size
    ){

        return inventoryService.getItems(page,size);
    }

    @GetMapping(params = {"page"})
    public StandardResponse searchInventory(
            @RequestParam(value = "page") int page,
            @RequestParam(value = "size",defaultValue = "10") int size,
            @RequestParam(value = "itemName",required = false) String itemName,
            @RequestParam(value = "itemType",required = false) String itemType,
            @RequestParam(value = "brands",required = false)List<String> brands
            ){
        System.out.println(brands);
        return inventoryService.searchInventory(page,size,itemName,itemType,brands);

    }


}

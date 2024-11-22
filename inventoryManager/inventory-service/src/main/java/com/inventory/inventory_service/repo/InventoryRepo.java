package com.inventory.inventory_service.repo;

import com.inventory.inventory_service.entity.InventoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@EnableJpaRepositories
@Repository
public interface InventoryRepo extends JpaRepository<InventoryEntity,Integer> {


//    List<InventoryEntity> findInventoryByCriteria(@Param("itemName") String itemName,
//                                                  @Param("itemType") String itemType,
//                                                  @Param("itemType") String itemType,
//                                                  @Param("brands") List<String> brands);
    @Query("SELECT i FROM InventoryEntity i " +
        "WHERE (:itemName IS NULL OR i.itemName LIKE CONCAT('%', :itemName, '%')) " +
        "AND (:itemType IS NULL OR i.itemType = :itemType) " +
        "AND (:brands IS NULL OR i.brand IN :brands)")
    Page<InventoryEntity> findInventoryByCriteria(@Param("itemName") String itemName,
                                                   @Param("itemType") String itemType,
                                                   @Param("brands") List<String> brands,
                                                   PageRequest of);
}

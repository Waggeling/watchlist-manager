package com.example.watchlistmanagerbackend.watchedSeries;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tblWatchedSeries")
public class WatchedSeries {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String name;
    private String productionCountry;
    private int yearWatched;
    private String genre;
    private int rating;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getProductionCountry() {
        return productionCountry;
    }
    public void setProductionCountry(String productionCountry) {
        this.productionCountry = productionCountry;
    }
    public int getYearWatched() {
        return yearWatched;
    }
    public void setYearWatched(int yearWatched) {
        this.yearWatched = yearWatched;
    }
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }

}

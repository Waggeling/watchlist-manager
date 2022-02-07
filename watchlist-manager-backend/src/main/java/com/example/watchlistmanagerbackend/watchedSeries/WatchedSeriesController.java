package com.example.watchlistmanagerbackend.watchedSeries;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/watchedseries")
public class WatchedSeriesController {
	@Autowired
	WatchedSeriesRepository watchedSeriesRepository;

    @GetMapping("")
    public Iterable<WatchedSeries> showWatchedSeries() {
        return watchedSeriesRepository.findAll();
    }

    @PostMapping("/add")
    public void createWatchedSeries(@RequestBody WatchedSeries watchedSeries) {
        watchedSeriesRepository.save(watchedSeries);
    }

	@GetMapping("/{watchedSeriesId}")
	public WatchedSeries readWatchedSeries(@PathVariable Long watchedSeriesId) {
        Optional<WatchedSeries> watchedSeries = watchedSeriesRepository.findById(watchedSeriesId);
	
        if(watchedSeries.isPresent()) {
            return watchedSeries.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Watched series with this id not found.");
    }

    @PutMapping("/{watchedSeriesId}")
	public void updateWatchedSeries(@PathVariable Long watchedSeriesId, @RequestBody WatchedSeries watchedSeriesUpdate) {
        Optional<WatchedSeries> watchedSeries = watchedSeriesRepository.findById(watchedSeriesId);
	
        if(!watchedSeries.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Watched series with this id not found.");
        }
        
        WatchedSeries watchedSeriesInstance = watchedSeries.get();
        watchedSeriesInstance.setName(watchedSeriesUpdate.getName());
        watchedSeriesInstance.setProductionCountry(watchedSeriesUpdate.getProductionCountry());
        watchedSeriesInstance.setYearWatched(watchedSeriesUpdate.getYearWatched());
        watchedSeriesInstance.setGenre(watchedSeriesUpdate.getGenre());
        watchedSeriesInstance.setRating(watchedSeriesUpdate.getRating());
        watchedSeriesRepository.save(watchedSeriesInstance);
    }

    @DeleteMapping("/{watchedSeriesId}")
	public void deleteWatchedSeries(@PathVariable Long watchedSeriesId) {
        Optional<WatchedSeries> watchedSeries = watchedSeriesRepository.findById(watchedSeriesId);
	
        if(watchedSeries.isPresent()) {
            watchedSeriesRepository.deleteById(watchedSeriesId);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Watched series with this id not found.");
    }
}

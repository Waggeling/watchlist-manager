package com.example.watchlistmanagerbackend.watchedSeries;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchedSeriesRepository extends CrudRepository<WatchedSeries, Long>{
}

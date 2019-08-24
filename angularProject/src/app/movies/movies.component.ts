import { Component, OnInit } from '@angular/core';
import {Movie} from '../models/movie';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie: Movie = {
    id: 1,
    name: 'Thor',
    releaseYear: 2010
  }
  movies: Movie[];
  constructor(private movieService: MovieService) { }

  getMoviesFromService(): void{
    this.movieService.getMovies().subscribe(movie => this.movies = movie);
  }

  add(name: string, releaseYear: string): void{
    name = name.trim();
    if(Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0){
      alert("Name must not be blank, release year must be a number");
      return;
    }

    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.movieService.addMovie(newMovie).subscribe(insertedMovie =>{this.movies.push(insertedMovie)});
  }

  deleteMovie(id: Number): void{
    this.movieService.deleteMovie(id).subscribe(_ => {
      this.movies = this.movies.filter(eachMovie => eachMovie.id != id);
    });
  }

  ngOnInit() {
    this.getMoviesFromService();
  }

  //selectedMovie: Movie;
  //onSelect(movie: Movie){
    //this.selectedMovie = movie;
  //}
}

import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService} from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovieFromRouter();
  }

  getMovieFromRouter(): void{
    const id = +this.router.snapshot.paramMap.get('id');
    this.movieService.getMovieFromRouter(id).subscribe(movie => this.movie = movie);
  }

  save(): void{
    this.movieService.updateMovie(this.movie).subscribe(() => this.getBack());
  }

  getBack(): void{
    this.location.back();
  }
}

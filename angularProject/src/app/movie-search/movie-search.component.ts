import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchedSubject = new Subject<string>();
  constructor(private movieService: MovieService) { }

  search(searchString: string): void{
    this.searchedSubject.next(searchString);
  }

  ngOnInit() {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchedString: string) => this.movieService.searchMovie(searchedString))
    );
  }

}

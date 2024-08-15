import {AnimationBuilder, AnimationFactory, AnimationPlayer, animate, style} from '@angular/animations';
import {isPlatformBrowser} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {HelperService} from '_shared/services';
import {CustomCarouselItemDirective} from './custom-carousel-item.directive';

@Directive({
  selector: '[appCarouselItemElement]'
})
export class CarouselItemElementDirective {
}

@Component({
  selector: 'app-carousel',
  exportAs: 'app-custom-carousel',
  templateUrl: `./custom-carousel.component.html`,
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ContentChildren(CustomCarouselItemDirective) items: QueryList<CustomCarouselItemDirective>;
  @Input() timing = '250ms ease-in';
  @Input() delay = 2000;
  @Input() autoInit = true;
  carouselWrapperStyle = {};
  nextSlideTimerRef;
  hasChanged = false;
  isBrowser: boolean;
  currentSlide = 0;
  protected builder: AnimationBuilder;
  @ViewChildren(CarouselItemElementDirective, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;
  @ViewChild('appCarousel', {static: false}) private carousel: ElementRef;
  private player: AnimationPlayer;
  private itemWidth: number;

  constructor(protected b: AnimationBuilder,
    private helper: HelperService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.builder = b;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.init();
    }
  }

  ngAfterViewInit() {
  }

  public getItemWidth() {
    return this.itemWidth;
  }

  public setItemWidth(width) {
    this.itemWidth = width;
  }

  public getItemsElements() {
    return this.itemsElements;
  }

  public buildCustomAnimation(animationStyle) {
    return this.builder.build([
      animate(this.timing, style(animationStyle))
    ]);
  }

  public playCustomAnimation(animationStyle) {
    const myAnimation: AnimationFactory = this.buildCustomAnimation(animationStyle);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) {
      this.currentSlide = -1;
    }
    const newSlide = (this.currentSlide + 1) % this.items.length;
    this.goTo(newSlide);
  }

  prev() {
    if (this.currentSlide === 0) {
      return;
    }

    const newSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    this.goTo(newSlide);
  }

  goTo(position) {
    if (this.currentSlide === position) {
      return;
    }
    if (this.nextSlideTimerRef) {
      clearInterval(this.nextSlideTimerRef);
    }
    this.currentSlide = position % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildSliderAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  async init() {
    console.log('init');
    await this.helper.timeout(400);
    const items = await this.getItemsElements();
    console.log('items', items);
    if (items.first) {
      this.setItemWidth(
        await items.first.nativeElement.getBoundingClientRect().width
      );
      this.carouselWrapperStyle = {
        width: `${this.getItemWidth()}px`,
      };
    }
  }

  ngOnDestroy() {
  }

  private buildSliderAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)`}))
    ]);
  }
}

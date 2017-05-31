import { Output, Component, OnInit, AfterViewInit, Input, EventEmitter, ElementRef,
  Renderer, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'hg-editable-label',
  templateUrl: './editable-label.component.html',
  styleUrls: ['./editable-label.component.scss']
})
export class EditableLabelComponent implements OnInit, AfterViewInit {

  @Input() placeholder;
  @Input() text;
  @Input() permission = true;
  @Input() show = false;
  @ViewChild('myInput') input: ElementRef;

  originalText;
  tracker;
  el: ElementRef;
  @Output() save = new EventEmitter();

  constructor(el: ElementRef, private renderer: Renderer) {
    this.el = el;
  }

  ngOnInit() {
    this.originalText = this.text; // Saves a copy of the original field info.
  }

  ngAfterViewInit() {
    if (this.show) {
      setTimeout(() => {
        this.show = true;
        this.focus();
      }, 10);
    }
  }

  focus() {
    if (!!this.input) {
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'select');
      }, 20);
    }
  }

  makeEditable() {
    if (this.show === false) {
      this.show = true;
      this.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  compareClickEvent(globalEvent) {
    if (this.tracker !== globalEvent && this.show) {
      if (globalEvent.target.type === 'button' || globalEvent.target.type === 'submit') {
        this.cancelEditable();
      }
    }
  }

  @HostListener('document:dblclick', ['$event'])
  compareEvent(globalEvent) {
    if (this.tracker !== globalEvent && this.show) {
      this.cancelEditable();
    }
  }

  @HostListener('dblclick', ['$event'])
  trackEvent(newHostEvent) {
    this.tracker = newHostEvent;
  }

  cancelEditable() {
    this.show = false;
    this.text = this.originalText;
  }

  callSave() {
    let oldText = this.text;

    // Sets the field with the new text;
    setTimeout(() => {
      this.originalText = oldText;
      this.text = oldText;
    }, 0);
    this.save.emit(this.text);
    this.show = false;

  }
}

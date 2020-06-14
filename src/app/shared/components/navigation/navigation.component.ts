import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DialogService } from '../dialogs/dialog.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  layoutGap = '64';
  mode = 'side';
  fixedInViewport = true;
  opened = false;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);
    this.breakpointObserver.observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(() => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });
  }

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  private determineSidenavMode(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
      return;
    } else {
      this.fixedInViewport = true;
      this.mode = 'side';
    }
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    } else {
      this.layoutGap = '64';
    }
  }

  public isExtraSmallDevice(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Small);
  }
}

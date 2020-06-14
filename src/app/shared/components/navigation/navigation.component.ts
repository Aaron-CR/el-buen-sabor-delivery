import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../dialogs/sign-up/sign-up.component';
import { SignInComponent } from '../dialogs/sign-in/sign-in.component';

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
    private dialog: MatDialog
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

  signUp() {
    this.dialog.open(SignUpComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }

  signIn() {
    this.dialog.open(SignInComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
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

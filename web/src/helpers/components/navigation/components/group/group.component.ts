import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { NavigationComponent } from 'helpers/components/navigation/navigation.component';
import { HelpersNavigationService } from 'helpers/components/navigation/navigation.service';
import { NavigationItem } from 'helpers/components/navigation/navigation.types';

@Component({
    selector: 'navigation-group-item',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationGroupItemComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_autoCollapse: BooleanInput;

    @Input() autoCollapse: boolean;
    @Input() item: NavigationItem;
    @Input() name: string;

    private _navigationComponent: NavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpersavigationService: HelpersNavigationService
    ) { }

    ngOnInit(): void {
        // Get the parent navigation component
        this._navigationComponent = this._helpersavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._navigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}

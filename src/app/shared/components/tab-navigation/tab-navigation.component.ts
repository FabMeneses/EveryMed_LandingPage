import { Component, input, output, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-navigation',
  imports: [CommonModule],
  templateUrl: './tab-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent {
  activeTab = input.required<string>();
  tabs = input<(string | { id: string; label: string })[]>([]);
  tabChange = output<string>();
  enableUrlSync = input<boolean>(false);

  private readonly internalActiveTab = signal<string>('');

  readonly currentActiveTab = computed(() => {
    if (this.enableUrlSync()) {
      return this.internalActiveTab() || this.activeTab();
    }
    return this.activeTab();
  });

  constructor() {
    effect(() => {
      const activeTabValue = this.activeTab();
      if (!this.enableUrlSync()) {
        this.internalActiveTab.set(activeTabValue);
      } else {
        const currentFromUrl = this.internalActiveTab();
        if (!currentFromUrl || currentFromUrl !== activeTabValue) {
          const tabs = this.tabs();
          const tabExists = tabs.some(tab => this.getTabId(tab) === activeTabValue);
          if (tabExists) {
            this.internalActiveTab.set(activeTabValue);
          }
        }
      }
    });
  }

  getTabId(tab: string | { id: string; label: string }): string {
    return typeof tab === 'string' ? tab : tab.id;
  }

  getTabLabel(tab: string | { id: string; label: string }): string {
    return typeof tab === 'string' ? tab : tab.label;
  }

  onTabClick(tab: string | { id: string; label: string }): void {
    const tabId = this.getTabId(tab);
    const currentTab = this.currentActiveTab();

    if (tabId !== currentTab) {
      this.tabChange.emit(tabId);
    }
  }
}


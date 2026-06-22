const PLAN_STORAGE_KEY = 'prepmind_selected_plan';

export function setSelectedPlan(planId: string) {
  sessionStorage.setItem(PLAN_STORAGE_KEY, planId);
}

export function getSelectedPlan(): string | null {
  return sessionStorage.getItem(PLAN_STORAGE_KEY);
}

export function clearSelectedPlan() {
  sessionStorage.removeItem(PLAN_STORAGE_KEY);
}

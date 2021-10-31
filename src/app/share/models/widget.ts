export interface Widget {
  loading: boolean;
  load:    () => void;
  refresh: () => void;
}

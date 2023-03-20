interface RangeLimits {
    min: number;
    max: number;
}

interface RangeSliderProperties {
    onChange?: (range: RangeLimits) => void;
    rangeLimits: RangeLimits;
    currentRange: RangeLimits;
}

export { type RangeSliderProperties };

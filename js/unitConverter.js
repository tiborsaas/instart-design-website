
class ConvertTableUnits {
    constructor(tableWrapperRef, fromUnit) {
        this.root = tableWrapperRef;
        this.currentUnit = fromUnit; // cm - in
        this.ratio = 2.54; // inch in cm
        this.tableData = [];

        this.parseTable();
        this.updateTable();
        this.addButtonToggleEvent();
    }

    addButtonToggleEvent() {
        const button = this.root.querySelector('button.toggle');

        button.addEventListener('click', event => {
            this.currentUnit = this.currentUnit === 'cm' ? 'in' : 'cm';
            this.toggleButtonText(button);
            this.updateTable();
        });

        this.toggleButtonText(button);
    }

    toggleButtonText(button) {
        const toInch = 'Show US Sizes (in)';
        const toCm = 'Show metric sizes (cm)';
        button.textContent = this.currentUnit === 'in' ? toCm : toInch;
    }

    parseTable() {
        const cells = this.root.querySelectorAll('[convert]');
        cells.forEach(cell => {
            this.tableData.push({
                node: cell,
                value: parseFloat(cell.textContent),
            })
        });
    }

    updateTable() {
        this.tableData.forEach(cell => {
            const val = this.currentUnit === 'in' ? this.getImperial(cell.value) : this.getMetric(cell.value);
            cell.node.textContent = `${(val)} ${this.currentUnit}`;
        });
    }

    getMetric(val) {
        return this.precise(val * this.ratio);
    }

    getImperial(val) {
        const base = parseInt(val);
        const fraction = val - base;
        const floats = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];
        const symbols = ['⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];
        const floatIndex = floats.indexOf(fraction);
        const symbol = floatIndex !== -1 ? symbols[floatIndex] : '';
        return `${base}${symbol}`;
    }

    precise(x) {
        return Number.parseFloat(x).toFixed(1);
    }
}

const charts = document.querySelectorAll('.size-chart-wrapper');
charts.forEach(chart => {
    new ConvertTableUnits(chart, 'in');
});

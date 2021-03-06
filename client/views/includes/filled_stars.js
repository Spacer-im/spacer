Template.filledStars.helpers({
    numbers: function () {
        let value = isNaN(this.value) ? 0 : this.value;
        value = Math.min(Math.max(0, value), 5);
        return _.range(1, 6).map((i) => i <= value ? 100 : (Math.ceil(value) == i ? (value - Math.floor(value)) * 100 : 0));
    }
});
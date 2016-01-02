Template.filledStars.helpers({
    numbers: function () {
        let value = isNaN(this.value) ? 0 : this.value;
        value = Math.min(Math.max(0, value), 5);
        let res = [];
        for (let i = 1; i <= 5; i++) {
            res.push(i <= value ? 100 : (Math.ceil(value) == i ? (value - Math.floor(value)) * 100 : 0));
        }
        return res;
    }
});
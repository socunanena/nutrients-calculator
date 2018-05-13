<template>
  <div>
    <span>Weight</span>
    <input title="Weight" v-model.number="user.weight" />
    <span>Fat percentage</span>
    <input title="Fat percentage" v-model.number="user.fatPercentage" />
    <span>Activity level</span>
    <select title="Activity level" v-model.number="user.activityLevel">
      <option v-for="level in activityLevels">{{level}}</option>
    </select>
    <span>Goal</span>
    <select title="Goal" v-model.number="user.goal">
      <option v-for="goal in [0, 5, 10, 15, 20, 25, 30]">{{goal}}</option>
    </select>
    <span>{{bmr}}</span>
    <span>{{tdee}}</span>
    <span>Protein</span>
    <input title="Protein" v-model.number="user.macronutrients.protein" />
    <span>Fat</span>
    <input title="Fat" v-model.number="user.macronutrients.fat" />
    <span>Carbohydrates</span>
    <input title="Carbohydrates" v-model.number="user.macronutrients.carbohydrates" />
  </div>
</template>

<script>
  export default {
    name: 'Board',
    data: () => ({
      user: {
        weight: null,
        fatPercentage: null,
        activityLevel: null,
        goal: null,
        calories: {
          bmr: null,
          tdee: null,
        },
        macronutrients: {
          protein: null,
          fat: null,
          carbohydrates: null,
        },
      },
      activityLevels: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0],
    }),
    computed: {
      bmr: function () {
        const bmr = this.user.weight
          && this.user.fatPercentage
          && Math.round(370 + (21.6 * (this.user.weight * (100 - this.user.fatPercentage)) / 100));

        this.user.calories.bmr = bmr;

        return bmr;
      },
      tdee: function () {
        const tdee = this.user.activityLevel && Math.round(this.bmr * this.user.activityLevel);

        this.user.calories.tdee = tdee;

        return tdee;
      },
      carbohydrates: function () {
        const carbohydrates = this.user.calories.tdee
          && this.user.goal
          && this.user.macronutrients.protein
          && this.user.macronutrients.fat
          && Math.round(
            (
              this.user.calories.tdee * ((100 - this.user.goal) / 100)
              - (this.user.macronutrients.protein * 4)
              - (this.user.macronutrients.fat * 9)
            ) / 4
          );

        this.user.macronutrients.carbohydrates = carbohydrates;

        return carbohydrates;
      },
    },
  };
</script>

<style scoped>
</style>

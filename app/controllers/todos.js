import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createTodo: function(newTitle){
      var todo = this.store.createRecord('todo', {
        title: newTitle,
        isCompleted: false
      });

      this.set('newTitle', '');
      todo.save();
    }
  }
});

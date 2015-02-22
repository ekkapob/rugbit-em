import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createTodo: function(newTitle){
      if(Ember.isEmpty(newTitle)){
        return;
      }
      var todo = this.store.createRecord('todo', {
        title: newTitle,
        isCompleted: false
      });

      this.set('newTitle', '');
      todo.save();
    }
  }
});

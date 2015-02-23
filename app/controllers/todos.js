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
  },
  
  remaining: function(){
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  
  inflection: function(){
    var remaining = this.get('remaining');
    return (remaining === 1) ? 'item' : 'items';
  }.property('remaining')
});

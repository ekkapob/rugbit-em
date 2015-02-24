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
    },

    clearCompleted: function(){
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  allAreDone: function(key, value){
    // console.log(key + ': ' + value);
    if(value === undefined){
      return this.get('length') > 0 && this.isEvery('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

  hasCompleted: function(){
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function(){
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),
  
  remaining: function(){
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  
  inflection: function(){
    var remaining = this.get('remaining');
    return (remaining === 1) ? 'item' : 'items';
  }.property('remaining'),


});

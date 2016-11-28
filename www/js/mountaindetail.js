.controller('PopUpCtrl', function($scope, $ionicPopup) {

   // When button is clicked, the popup will be shown...
   $scope.showConfirm = function() {

      var confirmPopup = $ionicPopup.confirm({
         title: 'Title',
         template: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
         if(res) {
            console.log('Sure!');
         } else {
            console.log('Not sure!');
         }
      });

   };

})

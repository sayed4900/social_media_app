const imgElement = document.querySelector('.user-img');
const ulElement = document.querySelector('.user-pic');

const notifiIcon = document.querySelector('.notifi-icon');
const notificationList = document.querySelector('.notification-list');
const userId = document.getElementById("userId")
// const userFriends = document.getElementById("userFriends")
// const userFriendsInput = document.getElementById("userFriends").value;
// var userFriendsInputArray = userFriendsInput.split(',') ;

// for (var i in userFriendsInputArray) {
//     var obj = JSON.parse(userFriendsInputArray[i]);
//     console.log(obj);
// }
friendsId = ["63dc009f2ceba8fcb62bf601","63dbf95560c86ac5b929bc4d"];
// const userFriendsObject = JSON.parse(userFriendsInput);

imgElement.addEventListener('click', function() {
    ulElement.style.display = ulElement.style.display === 'none' ? 'block' : 'none';
});

notifiIcon.addEventListener('click', function() {
    notificationList.style.display = notificationList.style.display === 'none' ? 'block' : 'none';
  });
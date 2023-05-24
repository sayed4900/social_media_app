const imgElement = document.querySelector('.user-img');
const ulElement = document.querySelector('.user-pic');

const notifiIcon = document.querySelector('.notifi-icon');
const notificationList = document.querySelector('.notification-list');

imgElement.addEventListener('click', function() {
    ulElement.style.display = ulElement.style.display === 'none' ? 'block' : 'none';
});

notifiIcon.addEventListener('click', function() {
    notificationList.style.display = notificationList.style.display === 'none' ? 'block' : 'none';
  });
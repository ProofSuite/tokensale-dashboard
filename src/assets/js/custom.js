$('ducument').ready(function () {
  $("#country").countrySelect({
    defaultCountry: "af",
    preferredCountries: ['', '', '']
  });
})

particlesJS.load('particles-js', 'assets/js/particles.json', function() {});

var count_particles, stats, update;

count_particles = document.querySelector('.js-count-particles');
update = function() {
  requestAnimationFrame(update);
};
requestAnimationFrame(update);

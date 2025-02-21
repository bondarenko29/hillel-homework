const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.dots-container');

const imagesArray = [
    'https://img.freepik.com/free-photo/calm-clouds-summer-turquoise-majorca-ocean_1417-971.jpg?t=st=1740110408~exp=1740114008~hmac=ac0dc1eee4dc5cd0d14b9bba48085f97c8edaae45951008c41a7b16002ffae1c&w=1060',
    'https://media.istockphoto.com/id/1891910177/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%BB%D0%B0%D0%BA%D0%B8%D1%82%D0%BD%D0%B8%D0%B9-%D1%87%D0%B8%D1%81%D1%82%D0%B8%D0%B9-%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD-%D1%96-%D1%85%D0%B2%D0%B8%D0%BB%D1%8F-%D0%B4%D0%BB%D1%8F-%D1%81%D0%B5%D1%80%D1%84%D1%96%D0%BD%D0%B3%D1%83-%D0%BC%D1%80%D1%96%D1%8F-%D0%BF%D1%80%D0%BE-%D1%81%D0%B5%D1%80%D1%84%D1%96%D0%BD%D0%B3-%D0%B2-%D1%82%D1%80%D0%BE%D0%BF%D1%96%D0%BA%D0%B0%D1%85-%D0%B2%D0%B8%D0%B4-%D0%B7-%D0%B2%D0%B8%D1%81%D0%BE%D1%82%D0%B8-%D0%BF%D1%82%D0%B0%D1%88%D0%B8%D0%BD%D0%BE%D0%B3%D0%BE.jpg?s=2048x2048&w=is&k=20&c=rVhbZ7I08N67h2A5iumpNLTqSOF6s1KaV465pDi_a-4=',
    'https://media.istockphoto.com/id/465110510/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD-%D0%B8-%D0%B8%D0%B4%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BD%D0%B5%D0%B1%D0%BE.jpg?s=2048x2048&w=is&k=20&c=O5fLznH6DE_isYItiqf30qL2vgerhbz19yFcPj1SQ74=',
    'https://media.istockphoto.com/id/1147989465/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B5-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%BE%D0%B5-%D0%BC%D0%BE%D1%80%D0%B5-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B0%D1%8E%D1%89%D0%B5%D0%B9-%D1%81%D1%80%D0%B5%D0%B4%D1%8B-%D0%BF%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B9-%D0%B8-%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D1%8B.jpg?s=2048x2048&w=is&k=20&c=YYg_4twqyGMSvtCx4Lt0WB7H_r-0HE3DTxtFrwmv1cM=',
    'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea-ocean-with-white-cloud-blue-sky-copyspace_74190-8663.jpg?t=st=1740110374~exp=1740113974~hmac=c3ffb58b3e6f0796c3b301778e7ccd89e3a52f574a868f9ac034bd78c60f4907&w=1060',
]


let currentImage = 0;

function loadImagesArray() {
    imagesArray.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Image ${index + 1}`;
    slider.appendChild(img);

    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
  });

  const images = slider.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.dot');
  showImage(0, images, dots);
}

function showImage(index, images, dots) {
  images[currentImage].classList.remove('active');
  dots[currentImage].classList.remove('active');
  currentImage = index;
  images[currentImage].classList.add('active');
  dots[currentImage].classList.add('active');

  prevButton.style.display = currentImage === 0 ? 'none' : 'block';
  nextButton.style.display = currentImage === images.length - 1 ? 'none' : 'block';
}

prevButton.addEventListener('click', () => {
  const images = slider.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.dot');
  showImage(currentImage -1, images, dots);
});

nextButton.addEventListener('click', () => {
  const images = slider.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.dot');
  showImage(currentImage + 1, images, dots);
});

dotsContainer.addEventListener('click', (event) => {
  const images = slider.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.dot');
  if (event.target.classList.contains('dot')) {
    const dotIndex = Array.from(dots).indexOf(event.target);
    showImage(dotIndex, images, dots);
  }
});

loadImagesArray();


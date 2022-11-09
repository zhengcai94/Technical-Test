const albumCaption = document.getElementsByClassName("caption")[0];
const tableHeader = document.getElementsByClassName("table-header")[0];
const tableBody = document.getElementsByClassName("table-body")[0];
let albumList = [];

async function getAlbumList() {
  const apiUrl =
    "https://63631d3566f75177ea3d93eb.mockapi.io/api/product/albums";
  try {
    const response = await fetch(apiUrl);
    albumList = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function createAlbumList() {
  await getAlbumList();
  albumList.sort((a, b) => b.rating - a.rating);
  albumCaption.textContent = `${albumList.length} albums`;
  //create table header for larger device
  createTableHeaderForLargerDevice();
  //create table header for mobile device
  createTableHeaderForMobileDevice();
  albumList.forEach((item) => {
    const albumItem = document.createElement("tr");
    const albumName = document.createElement("td");
    albumName.textContent = item.albumName;
    const artistName = document.createElement("td");
    artistName.textContent = item.artistName;
    const albumImage = document.createElement("td");
    albumImage.classList.add("image-container");
    const image = document.createElement("img");
    image.setAttribute("src", item.albumImage);
    albumImage.append(image);
    const rating = document.createElement("td");
    rating.textContent = item.rating;
    albumItem.append(albumName, artistName, albumImage, rating);
    tableBody.append(albumItem);
  });
}

function createTableHeaderForLargerDevice() {
  const headerRow = document.createElement("tr");
  const albumName = document.createElement("th");
  headerRow.classList.add("large-header");
  albumName.textContent = "Album Name";
  const artistName = document.createElement("th");
  artistName.textContent = "Artist Name";
  const albumImage = document.createElement("th");
  albumImage.textContent = "Image";
  const rating = document.createElement("th");
  rating.textContent = "Rating";
  headerRow.append(albumName, artistName, albumImage, rating);
  tableHeader.append(headerRow);
}

function createTableHeaderForMobileDevice() {
  const headerRow = document.createElement("tr");
  const headerContent = document.createElement("th");
  headerRow.classList.add("mobile-header");
  headerContent.textContent = "Album List";
  headerRow.append(headerContent);
  tableHeader.append(headerRow);
}

createAlbumList();

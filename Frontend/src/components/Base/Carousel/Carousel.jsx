import React from "react";
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
  MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBView, MDBMask
} from "mdbreact";

import "./Carousel.css";


const MultiCarouselPage = () => {
  return (
    <section>
      <MDBRow>
        <MDBCol>
          <div class="polaroid rotate_right">
            <img className="rotated-image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2Fd5%2Fb3%2F39%2Fd5b33933265ef778516098a1ea331fbf.jpg&f=1&nofb=1" alt="Pulpit rock" width="284" height="213" />
            <p class="caption">Mystery novels</p>
          </div>

          <div class="polaroid rotate_left">
            <img className="rotated-image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialbookshelves.com%2Fwp-content%2Fuploads%2F2015%2F02%2FThe_Shining_by_Stephen_King_Final_Cover.jpg&f=1&nofb=1" alt="Monterosso al Mare" width="284" height="213" />
            <p class="caption">Horrors</p>
          </div>
        </MDBCol>
        <MDBCol>
          <div class="polaroid rotate_right">
            <img className="rotated-image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg1.od-cdn.com%2FImageType-100%2F0211-1%2F%257B60FCCAC4-1DF4-4A57-9220-23300C3C370E%257DImg100.jpg&f=1&nofb=1" alt="Pulpit rock" width="284" height="213" />
            <p class="caption">Techno-thrillers</p>
          </div>

          <div class="polaroid rotate_left">
            <img className="rotated-image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.booksatruestory.com%2Fwp-content%2Fuploads%2F2013%2F08%2FHarry-Potter-and-the-Sorcerers-Stone.jpg&f=1&nofb=1" alt="Monterosso al Mare" width="284" height="213" />
            <p class="caption">Fantasies</p>
          </div>
        </MDBCol>
      </MDBRow>
      <div id="many-more"> And many more... Sign up now and start reading!</div>
    </section>
  );
}

export default MultiCarouselPage;
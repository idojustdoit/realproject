import React from "react";
import Carousel from "react-grid-carousel";
import styled from "styled-components";

const CATEGORY_DUMMY = [
  {
    index: 0,
    name: "전체",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 1,
    name: "자격증",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 2,
    name: "대입",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 3,
    name: "독서",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 4,
    name: "자기계발",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },

  {
    index: 5,
    name: "취미",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 6,
    name: "어학",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 7,
    name: "코딩",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 8,
    name: "공무원",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 9,
    name: "자유주제",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
];

const Category = () => {
  return (
    <Container>
      <TitleH2>카테고리</TitleH2>
      <Row>
        <Carousel
          cols={8}
          rows={1}
          gap={15}
          mobileBreakpoint={670}
          arrowRight={<ArrowBtn type="right" />}
          arrowLeft={<ArrowBtn type="left" />}
        >
          {CATEGORY_DUMMY.map((cate, i) => (
            <Carousel.Item key={i}>
              <Card>
                <Img img={`${cate.imageUrl}`} />
                <Title>{cate.name}</Title>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100%;
  /* width: 1920px; */
  padding: 0 300px;
`;

const Row = styled.div`
  margin: 40px 0;
`;

const ArrowBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 40%;
  right: ${({ type }) => (type === "right" ? "-40px" : "unset")};
  left: ${({ type }) => (type === "left" ? "-40px" : "unset")};
  width: 30px;
  height: 30px;
  background: black;
  border-radius: 50%;

  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ type }) =>
      type === "right"
        ? "translate(-75%, -50%) rotate(45deg)"
        : "translate(-25%, -50%) rotate(-135deg)"};
    width: 10px;
    height: 10px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
  }
`;

const Card = styled.div`
  margin: 0;
  overflow: hidden;
  cursor: pointer;
`;

const Img = styled.div`
  min-height: 140px;
  min-width: 140px;
  border-radius: 50%;
  margin-bottom: 12px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.div`
  margin: 0 10px 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const TitleH2 = styled.h2`
  /* margin-bottom: 25px; */
  margin-top: 60px;
  padding-left: 5px;
  font-size: 30px;
  font-weight: 700;
  line-height: 42px;
`;

export default Category;

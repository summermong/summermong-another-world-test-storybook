import { useState } from 'react';
import styled from 'styled-components';
import { ChoiceButton } from '../stories/Button.stories';
import questionData from '../data/questionData';
import { useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';

const Questions = () => {
  const navigate = useNavigate();

  const [curQIdx, setCurQIdx] = useState(0);
  const curQ = questionData[curQIdx];

  const [ie, setIE] = useState(0);
  const [ns, setNS] = useState(0);
  const [tf, setTF] = useState(0);
  const [pj, setPJ] = useState(0);

  const [width, setWidth] = useState(0);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);

  const css = {
    borderRadius: '10px',
  };

  const handleNextQ = type => {
    if (curQIdx + 1 < questionData.length) {
      setCurQIdx(prevIdx => prevIdx + 1);

      setWidth(((curQIdx + 2) / questionData.length) * 250);

      switch (type) {
        case 'E':
          setIE(prev => prev + 1);
          break;
        case 'S':
          setNS(prev => prev + 1);
          break;
        case 'F':
          setTF(prev => prev + 1);
          break;
        case 'J':
          setPJ(prev => prev + 1);
          break;
        default:
          return;
      }
    } else {
      setIsLoadingOpen(true);
      let mbti = '';

      mbti += ie >= 2 ? 'E' : 'I';
      mbti += ns >= 2 ? 'S' : 'N';
      mbti += tf >= 2 ? 'F' : 'T';
      mbti += pj >= 2 ? 'J' : 'P';

      setTimeout(() => {
        setIsLoadingOpen(false);
        navigate(`/result/${mbti}`);
      }, '5000');
    }
  };

  const handlePrevQ = () => {
    if (curQIdx > 0) {
      setCurQIdx(prevIdx => {
        setWidth(((prevIdx - 1) / questionData.length) * 250);
        return prevIdx - 1;
      });
    }
  };

  return (
    <QuestionContainer>
      {isLoadingOpen ? (
        <LoadingSpinner>
          이세계로 로딩중...
          <BarLoader
            color="#bf8df2"
            height="10px"
            width="250px"
            loading={setIsLoadingOpen}
            aria-label="Loading Spinner"
            cssOverride={css}
            speedMultiplier="1"
          />
        </LoadingSpinner>
      ) : (
        <>
          <QuestionBox>
            <QuestionNum>Q. {curQ.Num}</QuestionNum>
            <div>{curQ.Q}</div>
          </QuestionBox>
          <BarAndPrevWrapper>
            <PreButton onClick={handlePrevQ}>◀️</PreButton>
            <ProgressBar>
              <Progress width={width} />
            </ProgressBar>
          </BarAndPrevWrapper>
          <AnswerBox>
            {curQ.A.map((answer, idx) => (
              <ChoiceButton
                key={idx}
                onClick={() => handleNextQ(answer.type)}
                label={answer.text}
                answer={answer}
              />
            ))}
          </AnswerBox>
        </>
      )}
    </QuestionContainer>
  );
};

const LoadingSpinner = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-weight: 700;
  text-shadow: 0 0 10px #bf8df2;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  color: white;
  gap: 10px;
`;

const QuestionBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  font-size: 16px;
  text-shadow: 0 0 10px #17bbd4;
`;

const QuestionNum = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const BarAndPrevWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 250px;
  height: 10px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 0 10px #df7abe;
  margin: 20px 0px;
`;

const PreButton = styled.button`
  color: white;
  background: transparent;
  text-shadow: 0 0 10px #df7abe;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #bf8df2;
  }
`;

const Progress = styled.div`
  width: ${props => props.width}px;
  height: 10px;
  background-color: #bf8df2;
  border-radius: 50px;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
  padding-top: 20px;
`;

export default Questions;

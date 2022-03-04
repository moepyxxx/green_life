import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultTemplate from '../../component/templates/Default';
import StepCounter from '../../component/molecules/StepCounter';
import StepContent from '../../component/molecules/StepContent';
import ReadTitle from '../../component/molecules/ReadTitle';
import StepPagination, { TStepPagination } from '../../component/molecules/StepPagination';
import CreateStep1 from '../../component/features/post/CreateStep1';
import CreateStep2 from '../../component/features/post/CreateStep2';
import CreateStep3 from '../../component/features/post/CreateStep3';
import CreateStep4 from '../../component/features/post/CreateStep4';
import { IPost } from './interfaces/post';
import axios from 'axios';

export default function PostCreate() {

  type TStepPagioations = {
    back: TStepPagination,
    next: TStepPagination
  }[]
  const [stepPaginations, setStepPaginations] = useState<TStepPagioations>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [post, setPost] = useState<IPost>();
  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    if (currentStep !== 2) return;

    // まだAPI実装されていないため一旦コメントアウト
    // axios.post(process.env.NEXT_PUBLIC_API_URL + 'images', {
    //   image: imageFile
    // }).then(res => {
    //   setPost({...post, imagePath: res.data.image });
    // });

  }, [currentStep])

  useEffect(() => {
    setStepPaginations(createStepPaginations());
  }, []);

  const stepTexts = [{
    main: '写真を選択',
    sub: 'こんにちは！あなたの大好きなグリーンをポストしてみましょう。'
  }, {
    main: 'ピン情報の追加',
    sub: '素敵な写真ですね！ピンをして写真に写っているグリーンのことを教えてください。'
  }, {
    main: 'タグ情報を追加',
    sub: '今日の気分や植物のことなど…自由にタグをつけましょう！オリジナルタグでもOKです'
  }, {
    main: 'コメントの編集',
    sub: '最後の仕上げです！グリーンへの愛を込めてあなたからのメッセージをどうぞ'
  }]; 

  const createStepPaginations = () : TStepPagioations => { 
    
    const created: TStepPagioations = [];
    stepTexts.reduce((accu, _, index) => {
      let back: TStepPagination;
      let next: TStepPagination;

      index === 0
        ? back = {
          isValid: false
        }
        : back = {
          isValid: true,
          text: stepTexts[index - 1].main,
          click: () => setCurrentStep(index)
        }
      ;

      index === stepTexts.length - 1
        ? next = {
          isValid: false
        }
        : next = {
          isValid: true,
          text: stepTexts[index + 1].main,
          click: () => setCurrentStep(index + 2)
        }
      ;

      created.push({
        next,
        back
      })

      return accu;
    }, 0)

    return created;
  }

  const stepContentsComponent = () => {
    switch(currentStep) {
      case 1:
        return <CreateStep1 setImageFile={setImageFile} post={post} setPost={setPost} />;
      case 2:
        return <CreateStep2 post={post} setPost={setPost} />;
      case 3:
        return <CreateStep3 post={post} setPost={setPost} />;
      case 4:
        return <CreateStep4 post={post} setPost={setPost} />;
    }
  }

  return (
    <DefaultTemplate>
      <>

        <StepLayout>
          <StepCounter
            allCount={stepPaginations.length}
            currentCount={currentStep}
          />
        </StepLayout>
          
          {stepPaginations.map((stepPagination, index) => {
            if (stepPaginations.length === 0) return null;

            return (
              <StepContent stepCount={index + 1} currentCount={currentStep} key={index}>
                <>
                  <ReadTitle
                    isIcon={false}
                    mainTitle={stepTexts[currentStep - 1].main}
                    subTitle={stepTexts[currentStep - 1].sub}
                  />
    
                  <Main>
                    {stepContentsComponent()}
                  </Main>

                  <StepPagination
                    next={stepPagination.next}
                    back={stepPagination.back}
                  />
  
                </>
              </StepContent>
            );
          })}
          
      </>
    </DefaultTemplate>
  )
}


const StepLayout = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
`;

const Main = styled.div`
  margin: 40px 0;
  text-align: center;
`;
# 🏢 D:T.A(Document Tax Administration)

### 01 프로젝트 배경 / Background

**건설업**을 다루는 회사에서 현장의 일용직 대상으로 **임금 지급** 시 관련된 자료를 아직까지도 수기로 관리하고 있는 현상을 발견하였습니다.

세금 계산 시 필요한 데이터를 선별하는 시간적 비용, 그리고 데이터를 관리자의 인적 비용이 불필요하게 낭비되고 있는 것을 인지하게 되었습니다.

불필요한 시간, 공간, 인적 낭비를 줄이기 위해, 데이터 관리자의 작업 효율성에 집중하여 관련된 웹/앱을 구성하기로 하였습니다.

A company in the **Construction Industry** is still manually managing data related to **payment of wages** to day laborers in the field.

The company realized that the time cost of sifting through the data needed to calculate taxes and the human cost of managing the data was
being unnecessarily wasted.

In order to reduce the unnecessary waste of time, space, and human resources, we decided to focus on the work efficiency of data managers
and organize related WebApp.

<br/>

### 02 방향성 / Goal

1. 회사 관련자만이 사용할 수 있는 사내 시스템으로 구성합니다.
   - 개인정보가 담겨 있어 외부에서 회원가입이 불가능한 시스템이며, 관련자만이 로그인 가능하고, 보안과 관련된 강력한 규칙이 적용됩니다.
2. 일별 작업한 일용직들에게 지급할 **개인정보, 작업 날짜, 지불 임금, 송금 내역, 작업 관련 내용** 등을 기술하여 DB에 저장합니다.
3. **월별** 얼마나 많은 일용직이 일을 하였으며, 임금은 얼마나 지불 되었는지 등의 데이터를 기준으로 시각화 합니다.
   - `d3.js` 또는 `chart.js`가 활용될 예정입니다.
4. **세무**와 관련된 업무를 처리하기 위해, 기존에 엑셀 또는 한글에서 내보내기 하여 출력하던 인쇄물을 웹앱에서도 **출력**할 수 있도록 기능을
   구성합니다.

<br/>

1. Configure the system as a company's internal system that only relevant people can use.

   - It is a system that contains personal information and cannot be signed up from outside, and only relevant people can log in, and strong
     rules regarding security are applied.

2. Describe the **personal information, date of work, wages paid, remittance details, work-related contents** to be paid to the laborers for
   each day's work and store them in the DB.
3. Visualize **per month** based on data such as how many day laborers worked, how much wages were paid, etc.
   - `d3.js` or `chart.js` will be utilized.
4. To handle **Taxation** related tasks, configure the function so that the printout that was previously exported from Excel or Hangul can
   be **printed** from the web app. configure the function.

<br/>

### 03 테스트 계정 / Test Account

> email : test1234@test.com
>
> password : test@#$1234

<br/>

### 04 진행상황 / Progress

> ☑︎ 75% / 100%

<br/>

### 05 Tech Stacks

`React` `TypeScript` `React-Query` `Redux-Toolkit` `Zod` `React-Hook-Form` `Emotion` `Jest` `d3.js` `Firebase`

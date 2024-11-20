// 액션 타입 정의
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const UPDATE_DATA = 'UPDATE_DATA';

// 데이터 요청 액션 생성자
export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

// 데이터 성공적으로 가져오기 액션 생성자
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

// 데이터 가져오기 실패 액션 생성자
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// 데이터 업데이트 액션 생성자
export const updateDataAction = (newData) => ({
  type: UPDATE_DATA,
  payload: newData,
});

// 비동기 데이터 가져오기 함수 - api localhost:8080 호출하는 구간 
export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('http://localhost:8080/api/data');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};
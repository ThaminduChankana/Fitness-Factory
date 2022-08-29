import {
	WORKOUT_LIST_REQUEST,
	WORKOUT_LIST_SUCCESS,
	WORKOUT_LIST_FAIL,
	WORKOUT_CREATE_REQUEST,
	WORKOUT_CREATE_SUCCESS,
	WORKOUT_CREATE_FAIL,
	WORKOUT_UPDATE_REQUEST,
	WORKOUT_UPDATE_SUCCESS,
	WORKOUT_UPDATE_FAIL,
	WORKOUT_DELETE_REQUEST,
	WORKOUT_DELETE_SUCCESS,
	WORKOUT_DELETE_FAIL,
} from "../constants/workoutConstants";
import axios from "axios";
import swal from "sweetalert";

export const listWorkoutHandling = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: WORKOUT_LIST_REQUEST,
        });

        	const {
						trainer_Login: { trainerInfo },
					} = getState();

					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${trainerInfo.token}`,
						},
					};
        const { data } = await axios.get(`/user/trainer/workout/get`, config);
        dispatch({
            type: WORKOUT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: WORKOUT_LIST_FAIL,
            payload: message,
        });
    }
};
export const createWorkoutHandlingAction =
    (workoutID, name, workoutCategory, instructions, repetitions, tips, image) => async (dispatch, getState) => {
        try {
            dispatch({
                type: WORKOUT_CREATE_REQUEST,
            });
            const {
                trainer_Login: { trainerInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${trainerInfo.token}`,
                },
            };
            const { data } = await axios.post(`/user/trainer/workout/create`,
            {
                workoutID, name, workoutCategory, instructions, repetitions, tips, image,
                    
            },
            config
            );
            dispatch({
							type: WORKOUT_CREATE_SUCCESS,
							payload: data,
            });
            	swal({
								title: "Success !!!",
								text: "A Workout successfully created.",
								icon: "success",
								timer: 2000,
								button: false,
                });
          setTimeout(function () {
						window.location.href = "/workout-Handling-View";
					}, 2000);

        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
						dispatch({
							type: WORKOUT_CREATE_FAIL,
							payload: message,
						});
        }
    };
export const updateWorkouteHandlingAction =
	(id,workoutID, name, workoutCategory, instructions, repetitions, tips, image) => async (dispatch, getState) => {
		try {
			dispatch({
				type: WORKOUT_UPDATE_REQUEST,
			});

			const {
				trainer_Login: { trainerInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${trainerInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/user/trainer/workout/get/${id}`,
				{
					workoutID,
					name,
					workoutCategory,
					instructions,
					repetitions,
					tips,
					image,
				},
				config
			);
			dispatch({
				type: WORKOUT_UPDATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Workout  successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/workout-Handling-View";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: WORKOUT_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteWorkoutAction = (id) => async (dispatch, getState) => {
try {
	dispatch({
		type: WORKOUT_DELETE_REQUEST,
	});

	const {
		trainer_Login: { trainerInfo },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${trainerInfo.token}`,
		},
	};

	const { data } = await axios.delete(`/user/trainer/workout/get/${id}`, config);

	dispatch({
		type: WORKOUT_DELETE_SUCCESS,
		payload: data,
	});
} catch (error) {
	const message = error.response && error.response.data.message ? error.response.data.message : error.message;
	dispatch({
		type: WORKOUT_DELETE_FAIL,
		payload: message,
	});
}

}
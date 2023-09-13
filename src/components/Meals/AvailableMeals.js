import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './Available.module.css';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response =
                await fetch(
                    'https://food-app-api-a509f-default-rtdb.firebaseio.com/DUMMY_MEALS.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            };

            const data = await response.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: data[key].id,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            };
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    if (isLoading) {
        return <section className={styles.mealIsLoading}>
            <p>Loading...</p>
        </section>
    };

    if (httpError) {
        return <section className={styles.mealsError}>
            <p>{httpError}</p>
        </section>
    };

    const mealsList = meals.map((meal) =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />);

    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};


export default AvailableMeals;

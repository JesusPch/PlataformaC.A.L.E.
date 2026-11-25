import {useState, useEffect} from "react";

export function useShowStudentList() {
    const students = [
        {
            id: 1,
            name: "Juan",
            lastName: "Pérez",
            age: 20,
            accountNumber: "000001",
            email: "juan.perez@example.com",
            modality: "Presencial",
            phone_number: "1234567890",
            level: "9",
            progress: 50,
            hours: 17,
            released: true,
            releaseDate: "01-01-2026"
        },
        {
            id: 2,
            name: "Maria",
            lastName: "Perez",
            age: 22,
            email: "maria.perez@example.com",
            accountNumber: "000002",
            email: "maria.perez@example.com",
            modality: "Presencial",
            phone_number: "0987654321",
            level: "Intensivo 5",
            progress: 100,
            hours: 20,
            released: false,
            releaseDate: "00-00-0000"
        },
        {
            id: 3,
            name: "Juan",
            lastName: "Pérez",
            age: 20,
            email: "juan.perez@example.com",
            accountNumber: "000001",
            modality: "Presencial",
            phone_number: "1234567890",
            level: "9",
            progress: 75,
            hours: 20,
            released: false,
            releaseDate: "00-00-0000"
        },
        {
            id: 4,
            name: "Maria",
            lastName: "Perez",
            age: 22,
            email: "maria.perez@example.com",
            accountNumber: "000002",
            modality: "Presencial",
            phone_number: "0987654321",
            level: "Intensivo 5",
            progress: 25,
            hours: 6,
            released: true,
            releaseDate: "01-01-2026"
        },
        {
            id: 5,
            name: "Juan",
            lastName: "Pérez",
            age: 20,
            email: "uan.perez@example.com",
            accountNumber: "000001",
            modality: "Presencial",
            phone_number: "1234567890",
            level: "9",
            progress: 75,
            hours: 15,
            released: true,
            releaseDate: "01-01-2026"
        },
        {
            id: 6,
            name: "Maria",
            lastName: "Perez",
            age: 22,
            email: "maria.perez@example.com",
            accountNumber: "000002",
            modality: "Presencial",
            phone_number: "0987654321",
            level: "Intensivo 5",
            progress: 25,
            hours: "7",
            released: false,
            releaseDate: "00-00-0000"
            
        }
    ]
    return {
        students
    };
}
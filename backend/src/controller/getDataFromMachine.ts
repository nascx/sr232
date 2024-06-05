'use strict';

import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { Request, response, Response } from 'express'

const path: string = 'COM3';
const baudRate: number = 9600; 

const port = new SerialPort({ path, baudRate });

export const listenForData = async (req: Request, res: Response) => {
    try {
      // Send "on" command to serial port (if needed)
      port.write('on', (err) => {
        if (err) {
          console.error('Error sending command to serial port:', err);
          res.status(500).json({ message: 'Error communicating with serial port' });
          return; // Exit the function early if an error occurs
        }
        console.log('Command "on" sent successfully');
      });
  
      // Create a ReadlineParser for serial port data
      const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  
      // Initialize an empty array to store received data
      const arr: string[] = [];
  
      // Handle incoming data from serial port
      for await (const data of parser) {
        arr.push(data);
        
        // Check if enough data has been received (13 items)
        if (arr.includes('#RIGHT NG') || arr.includes('#RIGHT OK')) {

          const right = arr.find((r) => {
            if (r === '#RIGHT NG' || r === '#RIGHT OK') {
              return r
            }
          })

          const left = arr.find((r) => {
            if (r === '#LEFT NG' || r === '#LEFT OK') {
              return r
            }
          })
          // Return the data as JSON response
          res.status(200).json({ left: left, right: right });
          return; // Exit the loop and end the request handling
        }
      }

      // If the loop finishes without reaching 13 items, send a message
      res.status(200).json({ message: 'Received data from serial port (less than 13 items)' });
      port.end(() => {
        console.log('fisished connection')
      })
    } catch (error) {
      console.error('Error during serial port communication:', error);
      res.status(500).json({ message: 'Error communicating with serial port' });
    }
  };
  
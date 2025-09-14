import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandHistory } from '../../models/CommandHistory';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
  data: CommandHistory[] = [
    {
      id: 1,
      agentAddress: '192.168.0.1',
      command: 'LS',
      status: 'SUCCESS',
      createdAt: '2025-09-14 15:00',
      finishedAt: '2025-09-14 15:01',
      usuario: 'Wesley'
    },
    {
      id: 2,
      agentAddress: '192.168.0.2',
      command: 'MKDIR',
      status: 'ERROR',
      createdAt: '2025-09-14 15:05',
      finishedAt: '2025-09-14 15:06',
      usuario: 'Ana'
    },
    {
      id: 3,
      agentAddress: '192.168.0.3',
      command: 'COPY',
      status: 'PENDING',
      createdAt: '2025-09-14 15:10',
      usuario: 'Carlos'
    }
  ];
}
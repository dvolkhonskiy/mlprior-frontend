import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule, DxRangeSelectorModule } from 'devextreme-angular';
import { DashboardDataService } from '../dashboard-data.service';
import {APIService} from '../../shared/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  providers: [
    DashboardDataService
  ]
})


export class TrendsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordsForm = new FormControl();
  filteredKeywords: Observable<string[]>;
  selectedKeywords: string[] = ['convolutional', 'reinforcement learning', 'computer vision', '3d' ];
  allKeywords: string[] = [
    '2d', '3d',
    'accuracy', 'action', 'adaptation', 'addition', 'adversarial', 'agent', 'algorithm', 'analysis', 'application',
    'approximation', 'architecture', 'area', 'artificial', 'attack', 'attention', 'automatic', 'autonomous',
    'average',
    'baseline', 'bayesian', 'benchmark', 'binary', 'bound', 'building',
    'call', 'camera', 'capacity', 'channel', 'class', 'classification', 'classifier', 'cloud', 'clustering', 'cnn',
    'communication', 'community', 'comparison', 'complex', 'complexity', 'compression', 'computation',
    'computational', 'computer', 'computer vision', 'condition', 'constant', 'constraint', 'context',
    'continuous', 'control', 'conventional', 'convergence', 'convex', 'convolutional', 'convolutional neural',
    'convolutional neural network', 'cost',
    'data', 'database', 'dataset', 'decision', 'deep', 'deep learning', 'deep neural', 'deep neural network', 'dense',
    'descent', 'design', 'detection', 'deterministic', 'dimension', 'discrete', 'distance', 'distribution',
    'dynamic', 'dynamics',
    'edge', 'efficient', 'embedding', 'empirical', 'end-to-end', 'energy', 'engineering', 'environment', 'error',
    'estimation', 'evaluation', 'expensive', 'experiment', 'extension',
    'face', 'feature', 'finite', 'function', 'fusion',
    'game', 'gaussian', 'generalization', 'generation', 'generative', 'generative adversarial', 'geometric', 'geometry',
    'github', 'global', 'gradient', 'graph',
    'hardware', 'heterogeneous', 'hidden', 'hierarchical', 'human', 'hybrid',
    'identification', 'images', 'implementation', 'inference', 'information', 'intelligence', 'interaction', 'internet',
    'iot', 'iterative',
    'joint',
    'knowledge',
    'labeled', 'language', 'large', 'large-scale', 'latent', 'layer', 'learning', 'level', 'limitations', 'linear',
    'localization', 'logic', 'loss',
    'machine', 'machine learning', 'management', 'map', 'mapping', 'markov', 'matrix', 'maximum', 'mechanism',
    'medical', 'memory', 'methodology', 'metric', 'minimum', 'mobile', 'model', 'multiple',
    'natural', 'natural language', 'nature', 'network', 'neural', 'neural networks', 'noisy', 'nonlinear', 'numerical',
    'object', 'objective', 'observations', 'online', 'optimal', 'optimization', 'original', 'output',
    'paper', 'parallel', 'parameters', 'partial', 'pattern', 'performance', 'policy', 'polynomial', 'pose', 'potential',
    'precision', 'prediction', 'prior', 'privacy', 'probability', 'problem', 'process',
    'quantum', 'query', 'question',
    'random', 'range', 'rate', 'real-time', 'real-world', 'realistic', 'recognition', 'reconstruction', 'recurrent',
    'recurrent neural', 'reduction', 'regression', 'regularization', 'reinforcement',
    'reinforcement learning', 'relationship', 'representation', 'research', 'response', 'retrieval', 'risk',
    'robot', 'robust', 'robustness',
    'scale', 'scenarios', 'scene', 'scheme', 'science', 'secure', 'security', 'segmentation', 'selection', 'semantic',
    'sensor', 'sequence', 'sequential', 'service', 'set', 'sets', 'shape', 'signal', 'similarity', 'simple',
    'simulation', 'simultaneously', 'single', 'small', 'social', 'software', 'solution', 'source', 'space',
    'sparse', 'spatial', 'spectral', 'speech', 'speed', 'stability', 'step', 'stochastic', 'storage',
    'strategy', 'structure', 'subset', 'supervised', 'support', 'synthesis', 'synthetic', 'system',
    'target', 'task', 'techniques', 'technology', 'temporal', 'test', 'text', 'theory', 'time', 'tool', 'tracking',
    'traffic', 'train', 'training', 'transfer', 'translation', 'transmission', 'tree', 'true',
    'uncertainty', 'unknown', 'unsupervised', 'user',
    'variational', 'variety', 'vector', 'video', 'vision', 'visual',
    'web', 'wireless', 'word', 'world'
  ];

  @ViewChild('fruitInput', {read: false, static: true}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {read: false, static: true}) matAutocomplete: MatAutocomplete;

  resolutionKeys: string[] = ['Month', 'Quarter', 'Half', 'Year'];
  resolutions = { Month: 1, Quarter: 3, Half: 6, Year: 12};
  resIdx = 'Quarter';
  trendInfo;
  visualRange;
  isLoading = true;


  constructor(public apiService: APIService, private service: DashboardDataService) {
    this.filteredKeywords = this.keywordsForm.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allKeywords.slice()));
  }

  ngOnInit() {
    this.fetchTrends(this.selectedKeywords.toString());
  }

  fetchTrends(keywords: string) {
    this.isLoading = true;
    this.apiService.getTrends(keywords).subscribe(
      data => {
        this.trendInfo = data.data;
        this.isLoading = false;
      },
      error =>  {
        console.log(error);
        this.isLoading = false;
      }
    );
  }




  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedKeywords.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.keywordsForm.setValue(null);
    }

    this.fetchTrends(this.selectedKeywords.toString());


  }

  remove(fruit: string): void {
    const index = this.selectedKeywords.indexOf(fruit);

    if (index >= 0) {
      this.selectedKeywords.splice(index, 1);
    }

    this.fetchTrends(this.selectedKeywords.toString());
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedKeywords.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.keywordsForm.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeywords.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}


